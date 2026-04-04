# RetroTimer Backend Deployment Lessons

## ⚠️ DO THIS NOW (Clean Up Mess)

**Current state:** Broken with `/api/index.ts`, multiple tsconfigs, complex vercel.json  
**Goal:** Get back to clean Express setup for Vercel  
**Time:** ~5 minutes

### Exact Commands to Run (In Order)

```bash
cd /private/tmp/RetroTimer-fresh/backend

# 1. DELETE handler files
rm -rf api/
rm -f tsconfig.api.json

# 2. RESTORE tsconfig.json to single config
# Replace entire file:
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# 3. RESTORE vercel.json to minimal
cat > vercel.json << 'EOF'
{
  "version": 2
}
EOF

# 4. RESTORE package.json build script (simple)
npm pkg set scripts.build="tsc"

# 5. TEST locally
npm run build
npm test

# 6. COMMIT clean state
cd /private/tmp/RetroTimer-fresh
git add -A
git commit -m "Fix: Remove API handler complexity, restore clean Express setup"
git push origin main

# 7. DEPLOY to Vercel
cd backend && vercel --prod

# 8. TEST endpoint (wait 30s for deployment)
sleep 30
curl -i https://backend-time4.vercel.app/api/users

# Expected: 200 OK (or valid error, NOT 500)
```

### Verification After Deploy

```bash
# All of these should succeed:
curl https://backend-time4.vercel.app/api/users | head -c 50
curl https://backend-time4.vercel.app/api/games | head -c 50
curl -X OPTIONS https://backend-time4.vercel.app/api/users -i | grep "Access-Control"

# All should return 200-level status codes
# All should have CORS headers
# None should be 500 or FUNCTION_INVOCATION_FAILED
```

---

## Problem Analysis

**What we were trying to do:** Deploy an Express.js backend to Vercel  
**What went wrong:** Created complex handler patterns, multiple TypeScript configs, and conflicting `/api/` routes that Vercel doesn't need for Express apps

---

## Key Insight: Vercel Auto-Detects Express

Vercel **automatically wraps Express apps as Vercel Functions**. It looks for:
- `src/server.ts`
- `src/index.ts`
- `src/app.ts`
- `server.ts`
- `index.ts`

**No custom `/api/` handlers needed.**

---

## Pitfalls We Hit

| Pitfall | What We Did | Why It Failed | Correct Approach |
|---------|------------|---------------|------------------|
| **Custom Handlers** | Created `/api/index.ts` | Conflicted with Express auto-detection | Delete `/api/` folder entirely |
| **Multiple TypeScript Configs** | Made `tsconfig.api.json` to compile both `src/` and `api/` | Only `tsconfig.json` with `include: ["src/**/*"]` works | Single tsconfig, only include src |
| **Over-Configuration** | Kept modifying `vercel.json` with `build`, `functions`, `outputs` | Vercel auto-detects Express, doesn't need them | Use `{ version: 2 }` or delete entirely |
| **No Root Cause Analysis** | Assumed code was broken, created unit tests for wrong handler | Never checked Vercel Express docs first | Always read framework-specific deployment docs |
| **Mixed Patterns** | Switched between VercelRequest/Response, Web Standard API, custom handlers | Each pattern was designed for different architectures | Express on Vercel uses standard Express |

---

## Correct Express on Vercel Setup

### 1. File Structure
```
backend/
├── src/
│   ├── server.ts          ← Main Express app (export as default)
│   ├── routes/            ← All routes
│   ├── models/            ← MongoDB models
│   ├── config/            ← Database config
│   └── utils/             ← Helpers
├── package.json           ← Standard npm setup
├── tsconfig.json          ← SINGLE config, include: ["src/**/*"]
├── vercel.json            ← { version: 2 } or deleted
└── dist/                  ← Compiled output (generated)

DELETE:
❌ /api/ folder
❌ /api/index.ts
❌ tsconfig.api.json
❌ Complex vercel.json configurations
```

### 2. src/server.ts Pattern
```typescript
import express from "express";

const app = express();

// All middleware and routes attached to app
app.use(cors(...));
app.use(express.json());
app.use("/api/users", userRouter);
// etc.

// EITHER export as default OR use app.listen()
export default app;
// OR
app.listen(process.env.PORT || 3000);
```

### 3. vercel.json (Minimal)
```json
{
  "version": 2
}
```

Or delete entirely — Vercel auto-detects.

### 4. tsconfig.json
```json
{
  "compilerOptions": { ... },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 5. package.json Scripts
```json
{
  "scripts": {
    "dev": "nodemon --watch src --exec tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest"
  }
}
```

---

## MongoDB + Vercel Checklist

- [x] Use MongoDB Vercel Native Integration (free tier, auto-managed)
- [x] Connection string injected as MONGODB_URI env var
- [x] IP allowlist configured in MongoDB Atlas (Vercel integration handles this)
- [x] Connection pooling via Mongoose (handles serverless cold starts)

**If MongoDB still fails on Vercel:**
1. Check MongoDB Atlas > Security > Network Access — should see Vercel's IPs
2. Test connection with: `curl https://backend-time4.vercel.app/health`
3. Check logs via Vercel dashboard (not CLI)

---

## For Future Agent Work

### Recovery from Deployment Chaos

**IF backend is in broken state with `/api/` handlers, multiple tsconfigs, complex vercel.json:**

```bash
# STEP 1: Identify clean checkpoint
git log --oneline backend/ | grep -E "(routes|middleware|models|database)" | head -5
# Look for commit BEFORE any `/api/index.ts` or `tsconfig.api.json` mentions

# STEP 2: Reset to clean state
git reset --hard <COMMIT_HASH>

# STEP 3: DELETE cruft files (if they somehow remain)
rm -rf backend/api/
rm -f backend/tsconfig.api.json
rm -f backend/vercel.json

# STEP 4: Verify src/server.ts is untouched
head -20 backend/src/server.ts | grep "import express"
```

### Required State (BEFORE deployment to Vercel)

```
backend/
├── src/server.ts           ✓ Must export Express app or use app.listen()
├── tsconfig.json           ✓ include: ["src/**/*"] ONLY
├── package.json            ✓ build: "tsc" ONLY
├── vercel.json             ✓ { "version": 2 } OR deleted
└── NO api/ folder          ✓ Must not exist
```

### Debugging Checklist (if deploy fails)

1. **Code 500 / FUNCTION_INVOCATION_FAILED**
   - Cause: MongoDB connection issue
   - Fix: Check MongoDB Atlas → Network Access → IP allowlist
   - Verify Vercel Native Integration is active

2. **Code 404 / NOT_FOUND**
   - Cause: Route path wrong
   - Fix: Ensure routes use `/api/users` not `/users` (unless that's the intent)

3. **TypeScript errors during build**
   - Cause: tsconfig.json includes wrong folders
   - Fix: `include: ["src/**/*"]` only, `exclude: ["node_modules", "dist"]`

4. **Multiple `tsconfig*.json` files exist**
   - Cause: Agent created conflicting configs
   - Fix: Delete all except `tsconfig.json`

### Never Do This Again

❌ Create `/api/index.ts` handlers for Express  
❌ Make multiple TypeScript config files  
❌ Use `VercelRequest`/`VercelResponse` with Express  
❌ Complex `vercel.json` with `build`, `functions`, `outputs`  
❌ Assume code is wrong before checking infrastructure  

### Success Criteria

```bash
# All of these must be TRUE:
✓ curl https://backend-time4.vercel.app/api/users returns 200 (or valid response)
✓ curl https://backend-time4.vercel.app/api/health works
✓ No 500 errors
✓ No FUNCTION_INVOCATION_FAILED
✓ MongoDB connects and returns data
✓ CORS headers present in response
```

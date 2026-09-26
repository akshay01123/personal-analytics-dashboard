# Real Data Integration Guide

This guide explains what data is needed for each platform and how to obtain it for integrating real APIs into the analytics dashboard.

## 📊 Current Dashboard Structure

The dashboard now tracks **2 accounts**:

### Account 1: Personal (akshay0112)
- **Instagram**: @akshay0112 (https://www.instagram.com/akshay0112/)
- **LinkedIn**: Akshay Srivastava (https://www.linkedin.com/in/akshay543/)
- **YouTube**: @akshaysrivastava5270 (https://www.youtube.com/@akshaysrivastava5270)
- **GitHub**: akshay01123 (https://github.com/akshay01123)

### Account 2: Japaneasy101
- **Instagram**: @japaneasy101 (https://www.instagram.com/japaneasy101/)
- **LinkedIn**: Japaneasy101 (Company Page) (https://www.linkedin.com/company/japaneasy101/)

---

## 🔌 How to Get Real Data

### 1. GitHub API ✅ (Can be done now - Phase 3)

**What Data We Track:**
- Followers
- Repositories  
- Commits
- Contributions
- Pull Requests
- Issues
- Stars
- Contribution Streak
- Last Activity Date

**How to Get It:**

```bash
# Option A: Using curl (no authentication required for public data)
curl https://api.github.com/users/akshay01123

# Option B: Using GitHub Token for higher rate limits
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
     https://api.github.com/users/akshay01123
```

**Required Data:**
- GitHub Username: `akshay01123` ✅ (Already have)
- GitHub Personal Access Token (optional, for private data): Need to generate from GitHub Settings

**Getting a GitHub Token:**
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Select scopes: `public_repo` (for public repo data)
4. Copy and save the token
5. Add to `.env` file: `VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx`

**API Endpoints:**
- User Profile: `GET https://api.github.com/users/{username}`
- Repositories: `GET https://api.github.com/users/{username}/repos`
- Commits: `GET https://api.github.com/repos/{owner}/{repo}/commits`
- Contributions Graph: Use GitHub GraphQL API

---

### 2. YouTube API 🟡 (Phase 4)

**What Data We Track:**
- Subscribers
- Total Views
- Video Count
- Avg Likes per Video
- Avg Comments per Video
- Last Upload Date
- Upload Streak

**How to Get It:**

**Required Data:**
- YouTube Channel ID: Need to find (search YouTube profile or use API)
- YouTube API Key: Need to generate from Google Cloud Console

**Getting YouTube API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials → API Key
5. Add to `.env` file: `VITE_YOUTUBE_API_KEY=AIzaSyD...`

**Finding Channel ID:**
1. Visit your YouTube channel
2. Go to "About" tab
3. Look for "Channel ID"
4. Or use API: `https://www.googleapis.com/youtube/v3/search?part=snippet&forMine=true&type=channel&key=YOUR_API_KEY`

**API Endpoints:**
```bash
# Get channel statistics
curl "https://www.youtube.com/oembed?url=https://www.youtube.com/@akshaysrivastava5270&format=json"

# Full stats (requires API Key)
curl "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=CHANNEL_ID&key=YOUR_API_KEY"

# Videos list
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=CHANNEL_ID&maxResults=50&key=YOUR_API_KEY"
```

**Rate Limits:**
- Free tier: 10,000 quota units/day
- Each analytics query: 1-6 quota units
- Recommended: Cache data, query once daily

---

### 3. Instagram API 🔴 (Phase 5 - CHALLENGING)

**Challenge:** Instagram restricts official API access significantly.

**What Data We Want to Track:**
- Followers
- Posts
- Likes (per post)
- Comments (per post)
- Reach/Views
- Engagement Rate
- Last Post Date
- Posting Streak

**Options (in order of preference):**

#### Option A: Instagram Graph API (Official - Requires Business Account)
- **Requirement**: Convert personal account to Business/Creator account
- **Approval**: Meta must approve access
- **Available Data**: Limited for personal profiles
- **Steps**:
  1. Convert Instagram account to Business or Creator account
  2. Create Facebook App at [developers.facebook.com](https://developers.facebook.com)
  3. Request Instagram Basic Display API or Instagram Insights API
  4. Get Business Account ID
  5. Generate access token

#### Option B: Unofficial Instagram Scraper (Not Recommended)
- **Tools**: Instagrapi, instagram-scraper libraries
- **Risks**: 
  - Against Instagram Terms of Service
  - Account may be banned
  - Not sustainable long-term
- **Not recommended for production**

#### Option C: Manual Entry
- Track data manually by visiting profile
- Enter counts periodically
- Better option if API access not available

**Recommendation for japaneasy101:**
The company page (https://www.linkedin.com/company/japaneasy101/) suggests this is a business presence. Instagram may have business account features available. Look into:
1. Converting to business account
2. Using Meta Business Manager
3. Requesting Graph API access for business metrics

---

### 4. LinkedIn API 🟡 (Phase 6 - LIMITED OPTIONS)

**Challenge:** LinkedIn doesn't have a public API for personal profile data.

**What Data We Want to Track:**

**For Account 1 (Personal Profile):**
- Connections
- Profile Views
- Posts
- Impressions
- Engagement
- Last Post Date
- Posting Streak

**For Account 2 (Company Page):**
- Followers
- Posts
- Impressions
- Engagement
- About
- Company Details

**Official Options:**

#### Option A: LinkedIn API (For Company Pages Only)
- **Requirement**: LinkedIn Business Account
- **Access**: Apply for LinkedIn API access
- **Steps**:
  1. Go to [LinkedIn Developers](https://www.linkedin.com/developers)
  2. Create an app
  3. Request access to Company Pages API
  4. Get credentials
  5. Integrate OAuth

**For Company Pages:**
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
     https://api.linkedin.com/rest/posts/...
```

#### Option B: LinkedIn Official Tools
- Use LinkedIn Page Analytics dashboard manually
- Export reports
- Update data periodically

#### Option C: Third-Party Services
- Services like Buffer, Sprout Social offer LinkedIn integration
- Not free, but official and reliable

**Recommendation for Japaneasy101:**
```
Since japaneasy101 is a company page (https://www.linkedin.com/company/japaneasy101/):
1. Use LinkedIn Official API for company pages
2. Or use LinkedIn's native analytics page and manual entry
3. Most practical: Use third-party social media management tools
```

---

## 📋 Data Requirements Summary

| Platform | Account | Easy API? | Method | Phase |
|----------|---------|-----------|--------|-------|
| GitHub | akshay01123 | ✅ YES | Official API + Token | 3 |
| YouTube | @akshaysrivastava5270 | 🟡 MODERATE | Official API + Key | 4 |
| Instagram | akshay0112 | 🔴 HARD | Business Account / Unofficial | 5 |
| Instagram | japaneasy101 | 🔴 HARD | Business Account / Unofficial | 5 |
| LinkedIn | akshay543 (personal) | 🔴 IMPOSSIBLE | No official API | - |
| LinkedIn | japaneasy101 (company) | 🟡 MODERATE | Official API | 6 |

---

## 🔑 Environment Template

Create `.env` file with your API credentials:

```bash
# GitHub API (Phase 3)
VITE_GITHUB_TOKEN=ghp_your_github_token_here

# YouTube API (Phase 4)
VITE_YOUTUBE_API_KEY=AIzaSyD_your_youtube_api_key_here
VITE_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxx

# Instagram API (Phase 5)
VITE_INSTAGRAM_ACCESS_TOKEN=EAABxxxxxxxx
VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID=123456789

# LinkedIn API (Phase 6)
VITE_LINKEDIN_ACCESS_TOKEN=AQVxxxxxxxxxxxx
VITE_LINKEDIN_COMPANY_ID=12345

# Backend API
VITE_API_BASE_URL=http://localhost:3000
```

**IMPORTANT:** Never commit `.env` to Git. Only commit `.env.example` with variable names.

---

## ✅ Integration Steps

### For Each Platform (when ready):

1. **Get Credentials**
   - Obtain API key/token from platform
   - Add to `.env` file

2. **Create Service File**
   ```typescript
   // src/services/githubAPI.ts
   export const githubAPI = {
     getProfile: async (username: string, token: string) => {
       // Fetch and format data
     }
   };
   ```

3. **Update Component**
   - Check if credentials exist
   - Use real API if available
   - Fall back to mock data

4. **Test**
   - Verify data matches platform
   - Check calculation accuracy
   - Monitor rate limits

---

## 🚀 Recommended Priority

1. **Phase 3 - GitHub** ✅ EASIEST
   - Official API with clear documentation
   - No complex authentication
   - Free tier sufficient
   - Start here for fastest results

2. **Phase 4 - YouTube** 🟡 MODERATE
   - Official API available
   - Need to enable in Google Cloud
   - Quota management needed
   - Good second step

3. **Phase 5 - Instagram** 🔴 HARDEST
   - Requires business account setup
   - Limited API access
   - May need manual workarounds
   - Consider waiting until Phases 3-4 are complete

4. **Phase 6 - LinkedIn** 🟡 MODERATE (FOR COMPANY ONLY)
   - No personal profile API
   - Company page: Official API exists
   - Recommend manual entry for personal
   - Can use third-party tools

---

## 💡 Alternative Solutions

If direct API integration is too challenging:

1. **Third-Party Dashboard Tools**
   - Use Buffer, Sprout Social, Hootsuite
   - They have official API integrations
   - Data flows through their platform
   - More reliable but requires subscription

2. **Hybrid Approach**
   - GitHub + YouTube: Real APIs (easier)
   - Instagram + LinkedIn: Manual or tools
   - Combine in one dashboard

3. **Browser Extension**
   - Visit each platform
   - Scrape visible metrics
   - Store locally
   - Simple but manual

---

## 🔍 Quick Reference

**Just Want the Profile Info?**
```bash
# GitHub
curl https://api.github.com/users/akshay01123 | jq '.'

# YouTube
curl "https://www.youtube.com/oembed?url=https://www.youtube.com/@akshaysrivastava5270&format=json"

# Instagram (public HTML scrape)
curl https://www.instagram.com/akshay0112/ | grep 'window._sharedData'

# LinkedIn (public HTML - limited)
curl https://www.linkedin.com/in/akshay543/
```

---

## ❓ Questions?

Reference these resources:
- [GitHub API Docs](https://docs.github.com/en/rest)
- [YouTube API Docs](https://developers.google.com/youtube/v3)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [LinkedIn API](https://www.linkedin.com/developers)
- [OAuth 2.0 Guide](https://oauth.net/2/)

---

## 📝 Status

- ✅ Account structure updated
- ✅ Travel section removed
- ⏳ Real API integration (Phases 3-6)
- ⏳ Database for historical data (Phase 2)

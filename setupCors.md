# Firebase Storage CORS Configuration Setup

Follow these steps to configure CORS for Firebase Storage to enable voter registration uploads.

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

## Step 3: Install Google Cloud SDK (if gsutil is not installed)

If you don't have `gsutil` installed, download and install the Google Cloud SDK:

https://cloud.google.com/sdk/docs/install

## Step 4: Set CORS Configuration

Run the following command to apply the CORS configuration to your Firebase Storage bucket:

```bash
gsutil cors set cors.json gs://devote-elections.appspot.com
```

## Step 5: Confirm Success

Verify that CORS is properly configured by running:

```bash
gsutil cors get gs://devote-elections.appspot.com
```

You should see the CORS configuration output showing the allowed origins, methods, and max age seconds.

---

**Note:** The `cors.json` file is already provided in the project root with the correct configuration for localhost development (`http://localhost:3000` and `http://localhost:3004`).
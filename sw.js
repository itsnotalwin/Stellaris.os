rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ---- notes (permanent stars) ----
    match /notes/{noteId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.creatorId == request.auth.uid;
      allow update: if request.auth != null
                    && resource.data.creatorId == request.auth.uid;
      allow delete: if request.auth != null
                    && resource.data.creatorId == request.auth.uid;
    }

    // ---- tempStars (ephemeral stars) ----
    match /tempStars/{tempId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }

    // ---- constellations (named star clusters) ----
    match /constellations/{constId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // ---- starPositions (live coordinates) ----
    match /starPositions/{starId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // ---- presence (peer glows) ----
    match /presence/{peerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

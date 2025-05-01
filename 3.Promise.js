let loginPromise = new Promise((resolve, reject) => {
    console.log("⏳ Checking user credentials...");

    const isAuthenticated = true; // simulate success/failure
    const user = "Firoz";
    if (isAuthenticated) {
        resolve(`✅ User authenticated successfully for ${user}`);
    } else {
        reject("❌ Authentication failed: Invalid username or password.");
    }
});

loginPromise
  .then((mess) => {
    console.log(mess);
    return "🔐 Fetching user dashboard data...";
  })
  .then((nextStep) => {
    console.log(nextStep);
    // Simulate final step
    console.log("📊 Loading dashboard...");
    return "📊 Dashboard loaded.";
  })
  .then((finalMessage) => {
    console.log(finalMessage);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("🔚 Process completed.");});

document.getElementById("portfolio-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());
    const bio = document.getElementById("bio").value;
    const education = document.getElementById("education").value;
    const projects = document.getElementById("projects").value;
    const experience = document.getElementById("experience").value;
  
    const portfolioData = { name, email, phone, skills, bio, education, projects, experience };
  
    try {
      const response = await fetch("http://localhost:5001/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Portfolio saved successfully!");
      } else {
        alert("Failed to save portfolio. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving your portfolio.");
    }
  });
  

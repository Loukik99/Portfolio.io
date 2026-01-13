document.getElementById("portfolio-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
  
    // Collect data from the form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value.split(",");
    const bio = document.getElementById("bio").value;
  
    // Reflect data in the Portfolio Preview
    const output = document.getElementById("output");
    output.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Skills:</strong> ${skills.map(skill => `<span>${skill.trim()}</span>`).join(", ")}</p>
      <p><strong>Bio:</strong> ${bio}</p>
    `;
  });
   
document.getElementById("portfolio-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent form submission

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    roles: document.getElementById("roles").value.split(",").map(role => role.trim()),
    skill1: document.getElementById("skill1").value.trim(),
    skill2: document.getElementById("skill2").value.trim(),
    skill3: document.getElementById("skill3").value.trim(),
    skill4: document.getElementById("skill4").value.trim(),
    skill5: document.getElementById("skill5").value.trim(),
    skill6: document.getElementById("skill6").value.trim(),
    bio: document.getElementById("bio").value,
    education: document.getElementById("education").value,
    project1: document.getElementById("projects1").value,
    project_details1: document.getElementById("pdetails1").value,
    project2: document.getElementById("projects2").value,
    project_details2: document.getElementById("pdetails2").value,
    project3: document.getElementById("projects3").value,
    project_details3: document.getElementById("pdetails3").value,
    experience: document.getElementById("experience").value,
    links: document.getElementById("links").value,
  };

  try {
    const response = await fetch('http://localhost:5000/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Portfolio saved successfully!');
      // Redirect to another page if needed
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to save portfolio. Please try again.');
  }
});

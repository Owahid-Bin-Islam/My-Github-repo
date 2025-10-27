const View = (() => {
  const main = document.getElementById("main-content");

  const renderEmployeeList = (employees) => {
    main.innerHTML = `
      <h2>Manage Employees</h2>
      <form id="employee-form">
        <input type="hidden" id="emp-id" />
        <input type="text" id="emp-name" placeholder="Name" required />
        <input type="email" id="emp-email" placeholder="Email" required />
        <input type="text" id="emp-dept" placeholder="Department" required />
        <button type="submit">Save Employee</button>
      </form>

      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Department</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${employees.map(emp => `
            <tr>
              <td>${emp.name}</td>
              <td>${emp.email}</td>
              <td>${emp.department}</td>
              <td>
                <button class="edit" data-id="${emp.id}">Edit</button>
                <button class="delete" data-id="${emp.id}">Delete</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    `;
  };

  const renderAttendance = (employees, attendance) => {
    const today = new Date().toISOString().split('T')[0];
    main.innerHTML = `
      <h2>Manage Attendance</h2>
      <table>
        <thead><tr><th>Name</th><th>Status</th></tr></thead>
        <tbody>
          ${employees.map(emp => `
            <tr>
              <td>${emp.name}</td>
              <td>
                <select class="att-status" data-id="${emp.id}">
                  <option value="">--Select--</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
      <button id="save-attendance">Save Attendance</button>
    `;
  };

  const renderPerformance = (employees, performance) => {
    main.innerHTML = `
      <h2>Manage Performance</h2>
      <form id="perf-form">
        <select id="perf-emp" required>
          <option value="">--Select Employee--</option>
          ${employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('')}
        </select>
        <input type="number" id="perf-rating" min="1" max="5" placeholder="Rating (1-5)" required />
        <textarea id="perf-comment" placeholder="Comment" required></textarea>
        <button type="submit">Add Record</button>
      </form>

      <h3>Performance Records</h3>
      ${employees.map(emp => `
        <div class="report">
          <h4>${emp.name}</h4>
          <ul>
            ${(performance[emp.id] || []).map(p => `<li>⭐ ${p.rating} - ${p.comment}</li>`).join('') || "<em>No records</em>"}
          </ul>
        </div>`).join('')}
    `;
  };

  return {
    renderEmployeeList,
    renderAttendance,
    renderPerformance
  };
})();

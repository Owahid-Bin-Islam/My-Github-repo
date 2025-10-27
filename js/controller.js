const Controller = (() => {
  const init = () => {
    loadEmployees();
    document.getElementById("tab-employees").addEventListener("click", loadEmployees);
    document.getElementById("tab-attendance").addEventListener("click", loadAttendance);
    document.getElementById("tab-performance").addEventListener("click", loadPerformance);
  };

  const loadEmployees = () => {
    const employees = Model.getEmployees();
    View.renderEmployeeList(employees);
    document.getElementById("employee-form").addEventListener("submit", handleEmployeeSubmit);
    document.querySelectorAll(".edit").forEach(btn => btn.addEventListener("click", editEmployee));
    document.querySelectorAll(".delete").forEach(btn => btn.addEventListener("click", deleteEmployee));
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("emp-id").value;
    const name = document.getElementById("emp-name").value;
    const email = document.getElementById("emp-email").value;
    const dept = document.getElementById("emp-dept").value;

    if (id) {
      Model.updateEmployee(Number(id), { name, email, department: dept });
    } else {
      Model.addEmployee({ name, email, department: dept });
    }

    loadEmployees();
  };

  const editEmployee = (e) => {
    const id = Number(e.target.dataset.id);
    const emp = Model.getEmployees().find(emp => emp.id === id);
    document.getElementById("emp-id").value = emp.id;
    document.getElementById("emp-name").value = emp.name;
    document.getElementById("emp-email").value = emp.email;
    document.getElementById("emp-dept").value = emp.department;
  };

  const deleteEmployee = (e) => {
    const id = Number(e.target.dataset.id);
    Model.deleteEmployee(id);
    loadEmployees();
  };

  const loadAttendance = () => {
    const employees = Model.getEmployees();
    const attendance = Model.getAttendance();
    View.renderAttendance(employees, attendance);

    document.getElementById("save-attendance").addEventListener("click", () => {
      const today = new Date().toISOString().split('T')[0];
      document.querySelectorAll(".att-status").forEach(sel => {
        if (sel.value) Model.markAttendance(today, sel.dataset.id, sel.value);
      });
      alert("Attendance saved!");
    });
  };

  const loadPerformance = () => {
    const employees = Model.getEmployees();
    const performance = Model.getPerformance();
    View.renderPerformance(employees, performance);

    document.getElementById("perf-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const empId = document.getElementById("perf-emp").value;
      const rating = document.getElementById("perf-rating").value;
      const comment = document.getElementById("perf-comment").value;
      Model.addPerformance(empId, { rating, comment });
      loadPerformance();
    });
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", Controller.init);

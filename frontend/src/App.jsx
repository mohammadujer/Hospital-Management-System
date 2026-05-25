import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    disease: "",
  });

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    experience: "",
    availability: "",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    status: "Scheduled",
  });

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  // ================= PATIENT =================

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/patients");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handlePatientChange = (e) => {
    setPatientForm({
      ...patientForm,
      [e.target.name]: e.target.value,
    });
  };

  const addOrUpdatePatient = async (e) => {
    e.preventDefault();

    const patientData = {
      ...patientForm,
      age: Number(patientForm.age),
    };

    try {
      if (editingPatientId) {
        await fetch(`http://localhost:8080/api/patients/${editingPatientId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        });

        setEditingPatientId(null);
      } else {
        await fetch("http://localhost:8080/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        });
      }

      setPatientForm({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        disease: "",
      });

      await fetchPatients();
      setActivePage("patients");
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const editPatient = (patient) => {
    setEditingPatientId(patient.id);

    setPatientForm({
      name: patient.name || "",
      age: patient.age || "",
      gender: patient.gender || "",
      phone: patient.phone || "",
      address: patient.address || "",
      disease: patient.disease || "",
    });
  };

  const cancelPatientEdit = () => {
    setEditingPatientId(null);

    setPatientForm({
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      disease: "",
    });
  };

  const deletePatient = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/patients/${id}`, {
        method: "DELETE",
      });

      await fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // ================= DOCTOR =================

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDoctorChange = (e) => {
    setDoctorForm({
      ...doctorForm,
      [e.target.name]: e.target.value,
    });
  };

  const addOrUpdateDoctor = async (e) => {
    e.preventDefault();

    const doctorData = {
      ...doctorForm,
      experience: Number(doctorForm.experience),
    };

    try {
      if (editingDoctorId) {
        await fetch(`http://localhost:8080/api/doctors/${editingDoctorId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        });

        setEditingDoctorId(null);
      } else {
        await fetch("http://localhost:8080/api/doctors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        });
      }

      setDoctorForm({
        name: "",
        specialization: "",
        phone: "",
        email: "",
        experience: "",
        availability: "",
      });

      await fetchDoctors();
      setActivePage("doctors");
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  const editDoctor = (doctor) => {
    setEditingDoctorId(doctor.id);

    setDoctorForm({
      name: doctor.name || "",
      specialization: doctor.specialization || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      experience: doctor.experience || "",
      availability: doctor.availability || "",
    });
  };

  const cancelDoctorEdit = () => {
    setEditingDoctorId(null);

    setDoctorForm({
      name: "",
      specialization: "",
      phone: "",
      email: "",
      experience: "",
      availability: "",
    });
  };

  const deleteDoctor = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/doctors/${id}`, {
        method: "DELETE",
      });

      await fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  // ================= APPOINTMENT =================

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleAppointmentChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value,
    });
  };

  const addOrUpdateAppointment = async (e) => {
    e.preventDefault();

    try {
      if (editingAppointmentId) {
        await fetch(
          `http://localhost:8080/api/appointments/${editingAppointmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentForm),
          }
        );

        setEditingAppointmentId(null);
      } else {
        await fetch("http://localhost:8080/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentForm),
        });
      }

      setAppointmentForm({
        patientName: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        status: "Scheduled",
      });

      await fetchAppointments();
      setActivePage("appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const editAppointment = (appointment) => {
    setEditingAppointmentId(appointment.id);

    setAppointmentForm({
      patientName: appointment.patientName || "",
      doctorName: appointment.doctorName || "",
      appointmentDate: appointment.appointmentDate || "",
      appointmentTime: appointment.appointmentTime || "",
      reason: appointment.reason || "",
      status: appointment.status || "Scheduled",
    });
  };

  const cancelAppointmentEdit = () => {
    setEditingAppointmentId(null);

    setAppointmentForm({
      patientName: "",
      doctorName: "",
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
      status: "Scheduled",
    });
  };

  const deleteAppointment = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/appointments/${id}`, {
        method: "DELETE",
      });

      await fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="logo">HMS</h2>

        <nav>
          <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
          <button onClick={() => setActivePage("patients")}>Patients</button>
          <button onClick={() => setActivePage("doctors")}>Doctors</button>
          <button onClick={() => setActivePage("appointments")}>
            Appointments
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>Hospital Management System</h1>
          <p>Manage patients, doctors and appointments</p>
        </header>

        {activePage === "dashboard" && (
          <section className="cards">
            <div className="card">
              <h3>Total Patients</h3>
              <p>{patients.length}</p>
            </div>

            <div className="card">
              <h3>Total Doctors</h3>
              <p>{doctors.length}</p>
            </div>

            <div className="card">
              <h3>Total Appointments</h3>
              <p>{appointments.length}</p>
            </div>
          </section>
        )}

        {activePage === "patients" && (
          <section className="page-section">
            <h2>Patient Management</h2>

            <form className="form" onSubmit={addOrUpdatePatient}>
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={patientForm.name}
                onChange={handlePatientChange}
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={patientForm.age}
                onChange={handlePatientChange}
                required
              />

              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={patientForm.gender}
                onChange={handlePatientChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={patientForm.phone}
                onChange={handlePatientChange}
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={patientForm.address}
                onChange={handlePatientChange}
                required
              />

              <input
                type="text"
                name="disease"
                placeholder="Disease"
                value={patientForm.disease}
                onChange={handlePatientChange}
                required
              />

              <button type="submit">
                {editingPatientId ? "Update Patient" : "Add Patient"}
              </button>

              {editingPatientId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelPatientEdit}
                >
                  Cancel
                </button>
              )}
            </form>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Disease</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.disease}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editPatient(patient)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deletePatient(patient.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activePage === "doctors" && (
          <section className="page-section">
            <h2>Doctor Management</h2>

            <form className="form" onSubmit={addOrUpdateDoctor}>
              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={doctorForm.name}
                onChange={handleDoctorChange}
                required
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={doctorForm.specialization}
                onChange={handleDoctorChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={doctorForm.phone}
                onChange={handleDoctorChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={doctorForm.email}
                onChange={handleDoctorChange}
                required
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={doctorForm.experience}
                onChange={handleDoctorChange}
                required
              />

              <input
                type="text"
                name="availability"
                placeholder="Availability"
                value={doctorForm.availability}
                onChange={handleDoctorChange}
                required
              />

              <button type="submit">
                {editingDoctorId ? "Update Doctor" : "Add Doctor"}
              </button>

              {editingDoctorId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelDoctorEdit}
                >
                  Cancel
                </button>
              )}
            </form>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.experience} years</td>
                    <td>{doctor.availability}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editDoctor(doctor)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteDoctor(doctor.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activePage === "appointments" && (
          <section className="page-section">
            <h2>Appointment Management</h2>

            <form className="form" onSubmit={addOrUpdateAppointment}>
              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                value={appointmentForm.patientName}
                onChange={handleAppointmentChange}
                required
              />

              <input
                type="text"
                name="doctorName"
                placeholder="Doctor Name"
                value={appointmentForm.doctorName}
                onChange={handleAppointmentChange}
                required
              />

              <input
                type="date"
                name="appointmentDate"
                value={appointmentForm.appointmentDate}
                onChange={handleAppointmentChange}
                required
              />

              <input
                type="time"
                name="appointmentTime"
                value={appointmentForm.appointmentTime}
                onChange={handleAppointmentChange}
                required
              />

              <input
                type="text"
                name="reason"
                placeholder="Reason"
                value={appointmentForm.reason}
                onChange={handleAppointmentChange}
                required
              />

              <select
                name="status"
                value={appointmentForm.status}
                onChange={handleAppointmentChange}
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button type="submit">
                {editingAppointmentId
                  ? "Update Appointment"
                  : "Book Appointment"}
              </button>

              {editingAppointmentId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelAppointmentEdit}
                >
                  Cancel
                </button>
              )}
            </form>

            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editAppointment(appointment)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
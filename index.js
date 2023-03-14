// Creating Appointment class

class Appointment {
    constructor(name, date) {
      this.name = name;
      this.date = date;
    }
  }
  // this creates the services to the API that will allow us to getAllAppointments, getAppointment, createAppointment, updateAppointment, and deleteAppointment.
  
  class AppointmentService {
    static url = "https://6410a400b21ab59f3384e98b.mockapi.io/Appointments";
  
    static getAllAppointments() {
      return $.get(this.url);
    }
  
    static getAppointment(id) {
      return $.get(`${this.url}/${id}`);
    }
  
    static createAppointment(appointment) {
      return $.post(this.url, appointment);
    }
  
    static updateAppointment(id, name, date) {
      const data = { name, date }; 
      return $.ajax({
        url: this.ur + `/${id}`,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",
        type: "PUT",
      });
    }
  
    static deleteAppointment(id) {
      return $.ajax({
        url: this.url + `/${id}`,
        type: "DELETE",
      });
    }
  }
  // this allows us to render code to achieve each of the different functions.
  
  class DOMManager {
    static Appointments;
  
    static getAllAppointments() {
      AppointmentService.getAllAppointments().then((appointments) =>
        this.render(appointments)
      );
    }
  
    static createAppointment(name, date) {
      AppointmentService.createAppointment(new Appointment(name, date))
        .then(() => AppointmentService.getAllAppointments())
        .then((appointments) => this.render(appointments));
    }
  
    static updateAppointment(id, name, date) {
      AppointmentService.updateAppointment(id, name, date)
        .then(() => AppointmentService.getAllAppointments())
        .then((appointments) => this.render(appointments));
    }
  
    static deleteAppointment(id) {
      AppointmentService.deleteAppointment(id).then(() =>
        AppointmentService.getAllAppointments().then((appointments) =>
          this.render(appointments)
        )
      );
    }
  // this created the code that is rendered every time we perform one of the above functions.
    
  static render(appointments) {
      this.appointments = appointments;
      $("#appointments").empty();
      for (let appointment of appointments) {
        $("#appointments").prepend(`
            <div class="col-sm-6 col-lg-4" style="margin-top: 15px;">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-date">${appointment.name}</h5>
                  <p class="card-text">${appointment.date}</p>
                </div>
              </div>
              <div class="col-sm">
              <div class="row">
                <div class="col-sm">
                  <input
                    type="text"
                    id="${appointment.id}-update-appointment-name"
                    class="form-control"
                    placeholder="Name"
                    required
                  />
                </div>
                <div class="col-sm">
                  <input
                    type="text"
                    id="${appointment.id}-update-appointment-date"
                    class="form-control"
                    placeholder="Date"
                    required
                  />
                </div>
                <button id="#${appointment.id}-update-appointment" class="btn btn-primary form-control" onclick="updateAppointment('${appointment.id}')">
                  Update Appointment
                </button>
                <button
                  id="delete-appointment"
                  class="btn btn-danger form-control"
                  onclick="DOMManager.deleteAppointment('${appointment.id}')"
                >
                  Delete Appointment
                </button>
              </div>
            </div>
            </div>
            <br />
            `);
      }
    }
  }
  
  //creates a new appointment.
 
  $("#add-new-appointment").click(() => {
    DOMManager.createAppointment(
      $("#new-appointment-name").val(),
      $("#new-appointment-date").val()
    );
    $("#new-appointment-name").val("");
    $("#new-appointment-date").val("");
  });
  
  //updates an appointment.
  
  function updateAppointment(id) {
    const name = $(`#${id}-update-appointment-name`).val();
    const date = $(`#${id}-update-appointment-date`).val();
   
    DOMManager.updateAppointment(id, name, date);
  }
  
  //gets all appointments on first render
  
  DOMManager.getAllAppointments();

  //allows us to delete an appointment

  DOMManager.deleteAppointment();
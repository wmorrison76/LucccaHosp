// src/modules/pastry/consultation/ConsultationBookingModule.js

export const scheduleConsultation = ({
  clientName,
  phone,
  eventDate,
  consultDate,
  consultationType = "Cake Design Consultation",
  calendarSystem,
}) => {
  const reminder1 = new Date(consultDate);
  reminder1.setDate(reminder1.getDate() - 3);

  const reminder2 = new Date(consultDate);
  reminder2.setDate(reminder2.getDate() - 1);

  const entry = {
    title: `${consultationType} with ${clientName}`,
    client: clientName,
    eventDate,
    consultDate,
    reminderDates: [reminder1.toISOString(), reminder2.toISOString()],
    confirmationRequired: true,
    assignedTo: "Cake Chef / Sales Rep",
    communication: {
      smsReminder: phone,
      sendToCalendar: calendarSystem || "LUCCCA_Calendar",
    },
  };

  // Save or send to calendar system
  return entry;
};

export default scheduleConsultation;

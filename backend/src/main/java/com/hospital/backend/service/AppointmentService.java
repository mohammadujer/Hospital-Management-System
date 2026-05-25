package com.hospital.backend.service;

import com.hospital.backend.model.Appointment;
import com.hospital.backend.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment addAppointment(Appointment appointment) {
        if (appointment.getStatus() == null || appointment.getStatus().isEmpty()) {
            appointment.setStatus("Scheduled");
        }

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(String id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public Appointment updateAppointment(String id, Appointment appointmentDetails) {
        Appointment existingAppointment = appointmentRepository.findById(id).orElse(null);

        if (existingAppointment == null) {
            return null;
        }

        existingAppointment.setPatientName(appointmentDetails.getPatientName());
        existingAppointment.setDoctorName(appointmentDetails.getDoctorName());
        existingAppointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        existingAppointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
        existingAppointment.setReason(appointmentDetails.getReason());
        existingAppointment.setStatus(appointmentDetails.getStatus());

        return appointmentRepository.save(existingAppointment);
    }

    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }
}
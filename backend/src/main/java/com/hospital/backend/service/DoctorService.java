package com.hospital.backend.service;

import com.hospital.backend.model.Doctor;
import com.hospital.backend.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(String id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor updateDoctor(String id, Doctor doctorDetails) {
        Doctor existingDoctor = doctorRepository.findById(id).orElse(null);

        if (existingDoctor == null) {
            return null;
        }

        existingDoctor.setName(doctorDetails.getName());
        existingDoctor.setSpecialization(doctorDetails.getSpecialization());
        existingDoctor.setPhone(doctorDetails.getPhone());
        existingDoctor.setEmail(doctorDetails.getEmail());
        existingDoctor.setExperience(doctorDetails.getExperience());
        existingDoctor.setAvailability(doctorDetails.getAvailability());

        return doctorRepository.save(existingDoctor);
    }

    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }
}
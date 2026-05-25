package com.hospital.backend.service;

import com.hospital.backend.model.Patient;
import com.hospital.backend.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(String id) {
        return patientRepository.findById(id).orElse(null);
    }

    public Patient updatePatient(String id, Patient patientDetails) {
        Patient existingPatient = patientRepository.findById(id).orElse(null);

        if (existingPatient == null) {
            return null;
        }

        existingPatient.setName(patientDetails.getName());
        existingPatient.setAge(patientDetails.getAge());
        existingPatient.setGender(patientDetails.getGender());
        existingPatient.setPhone(patientDetails.getPhone());
        existingPatient.setAddress(patientDetails.getAddress());
        existingPatient.setDisease(patientDetails.getDisease());

        return patientRepository.save(existingPatient);
    }

    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }
}
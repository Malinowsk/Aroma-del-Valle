package com.example.microservices_fragrances.service;

import com.example.microservices_fragrances.exception.NotFoundException;

import com.example.microservices_fragrances.dto.DTORequestFragrance;
import com.example.microservices_fragrances.dto.DTOResponseFragrance;
import com.example.microservices_fragrances.entity.Fragrance;
import com.example.microservices_fragrances.repository.FragranceRepository;
import org.apache.commons.io.FilenameUtils;
import jakarta.transaction.Transactional;
import jdk.jshell.spi.ExecutionControl;
import org.apache.tomcat.util.file.ConfigurationSource;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.nio.file.Files;

import static org.apache.tomcat.util.http.fileupload.IOUtils.*;

@Service
public class FragranceService {

    private static final String UrlImages = ".\\microservices_fragrances\\src\\main\\resources\\images\\";
    private final FragranceRepository fragranceRepository;

    public FragranceService(FragranceRepository fragranceRepository) {
        this.fragranceRepository = fragranceRepository;
    }

    @Transactional
    public List<DTOResponseFragrance> findAll() throws IOException {
        List<Fragrance> result = this.fragranceRepository.findAll().stream().map( Fragrance::new ).toList();
        List<DTOResponseFragrance> retorno = new ArrayList<>();
        for(Fragrance f: result){
            DTOResponseFragrance local = new DTOResponseFragrance(f);
            String adicional = f.getImage().replace("\\","/");
            String[] parts = adicional.split("/");
            local.setImage(loadAsResource(parts[parts.length-1]));
            retorno.add(local);
        }
        return retorno;
    }

    @Transactional
    public DTOResponseFragrance findById(Long id ){
        return this.fragranceRepository.findById( id )
                .map( DTOResponseFragrance::new )
                .orElseThrow( () -> new NotFoundException("fragrance", id));
    }


    @Transactional
    public DTOResponseFragrance save(DTORequestFragrance request){
        MultipartFile file = request.getImage();
        try {
            if(file.isEmpty()) {
                throw new IllegalArgumentException("Archivo vacio");
            }
            Path rootDir = Paths.get(UrlImages);
            // Crea el directorio si no existe
            Files.createDirectories(rootDir);
            Path destination = rootDir.resolve(Objects.requireNonNull(file.getOriginalFilename())).normalize().toAbsolutePath();


            try (InputStream inputStream = file.getInputStream()){
                Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
            }

            Fragrance fragrance = new Fragrance(request);
            fragrance.setImage(UrlImages+file.getOriginalFilename());
            Fragrance result = this.fragranceRepository.save(fragrance);
            DTOResponseFragrance retorno = new DTOResponseFragrance(result);
            retorno.setImage(loadAsResource(file.getOriginalFilename()));
            return retorno;

        } catch (IOException e) {
            throw new IllegalStateException("Error al guardar la imagen");
        }

    }

    public String loadAsResource(String filePath) throws IOException {
        Path path = Paths.get(UrlImages).resolve(filePath).normalize().toAbsolutePath();
        byte[] imagenBytes = Files.readAllBytes(path);
        // Obtener el tipo de imagen según la extensión del archivo
        String extension = FilenameUtils.getExtension(filePath);
        String imageType = "image/" + extension.toLowerCase();

        // Convertir la imagen a base64 y agregar el tipo de imagen como prefijo
        String base64Image = "data:" + imageType + ";base64," + Base64.getEncoder().encodeToString(imagenBytes);

        return base64Image;
    }

    @Transactional
    public void delete(Long id) {
        this.fragranceRepository.delete(this.fragranceRepository.findById(id).orElseThrow(
                () -> new NotFoundException("No se pudo eliminar fragancia con ID:" + id)));
    }

    @Transactional
    public Fragrance update(Long id, DTORequestFragrance request) {
        Fragrance fragrance = this.fragranceRepository.findById(id).orElseThrow(
                () -> new NotFoundException("No se encontro fragancia con ID: " + id));

        fragrance.setName(request.getName());
        //rent.setPhone_number(request.getPhone_number());
        //rent.setEmail(request.getEmail());

        return this.fragranceRepository.save(fragrance);
    }
}

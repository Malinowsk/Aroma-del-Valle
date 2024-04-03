package com.example.microservices_fragrances.controller;

import com.example.microservices_fragrances.dto.DTOResponseFragrance;
import com.example.microservices_fragrances.dto.DTORequestFragrance;

import com.example.microservices_fragrances.entity.Fragrance;
import com.example.microservices_fragrances.service.FragranceService;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.Data;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.geom.Arc2D;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@MultipartConfig
@RestController
@Data
@RequestMapping("api/fragancias")
public class FragrancesController {

    private final FragranceService fragrancesService;

    public FragrancesController(FragranceService fragrancesService) {
        this.fragrancesService = fragrancesService;
    }



    @PostMapping("")
    public ResponseEntity<?> save(@RequestPart("name") String name,
                                  @RequestPart("brand") String brand,
                                  @RequestPart("price") String price,
                                  @RequestPart("gender") String gender,
                                  @RequestPart("volume") String volume,
                                  @RequestPart("country") String country,
                                  @RequestPart("aromas") String aromas,
                                  @RequestPart("image") MultipartFile image){
        try {
            DTOResponseFragrance retorno = fragrancesService.save(new DTORequestFragrance(name,brand,Float.parseFloat(price),gender,Integer.parseInt(volume),country,aromas,image));
            //String contentType = Files.probeContentType(retorno.getImage().getFile().toPath());
            //HttpHeaders headers = new HttpHeaders();
            //headers.setContentLength(Files.size(Paths.get(retorno.getImage().getURI())));
            //headers.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity(retorno, HttpStatus.CREATED);
            //return ResponseEntity.status(HttpStatus.CREATED).body(retorno);

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocurrió un error, revise los datos ingresados.");
        }
    }

    ///////////////////////////////////////////////// ABM //////////////////////////////////////////////////////////////////////////

    @GetMapping("")
    public List<DTOResponseFragrance> findAll() throws IOException {
        return this.fragrancesService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserByID(@PathVariable Long id){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(fragrancesService.findById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error. No existe la fragancia con el ID: "+id);
        }
    }





    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteFragrance(@PathVariable Long id){
        try{
            this.fragrancesService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("Se elimino correctamente la fragancia con el id: " + id);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error. No se pudo eliminar la fragancia con id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editFragrance(@PathVariable Long id, @RequestBody @Validated DTORequestFragrance request){
        try {
            Fragrance fragrance = fragrancesService.update(id,request);
            DTOResponseFragrance response = new DTOResponseFragrance(fragrance);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo editar la fragancia con el ID: "+id);
        }
    }

}
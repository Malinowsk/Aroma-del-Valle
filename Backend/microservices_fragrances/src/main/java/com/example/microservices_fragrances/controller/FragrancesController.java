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
                                  @RequestParam("images[]") MultipartFile[] images,
                                  @RequestPart("installments") String installments,
                                  @RequestPart("interest_on_installments") String interest_on_installments,
                                  @RequestPart("free_shipping") String free_shipping,
                                  @RequestPart("best_seller") String best_seller,
                                  @RequestPart("description") String description
    ){
        try {
            return new ResponseEntity(fragrancesService.save(new DTORequestFragrance(name,brand,Float.parseFloat(price),gender,Integer.parseInt(volume),country,aromas,images, Integer.parseInt(installments), Float.parseFloat(interest_on_installments), Boolean.parseBoolean(free_shipping) ,Boolean.parseBoolean(best_seller) ,description)), HttpStatus.CREATED);
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
            return ResponseEntity.status(HttpStatus.OK).body("id:"+id);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error. No se pudo eliminar la fragancia con id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editFragrance(@PathVariable Long id, @RequestPart("name") String name,
                                           @RequestPart("brand") String brand,
                                           @RequestPart("price") String price,
                                           @RequestPart("gender") String gender,
                                           @RequestPart("volume") String volume,
                                           @RequestPart("country") String country,
                                           @RequestPart("aromas") String aromas,
                                           @RequestParam("images[]") MultipartFile[] images,
                                           @RequestPart("installments") String installments,
                                           @RequestPart("interest_on_installments") String interest_on_installments,
                                           @RequestPart("free_shipping") String free_shipping,
                                           @RequestPart("best_seller") String best_seller,
                                           @RequestPart("description") String description){
        try {
            DTOResponseFragrance response = fragrancesService.update(id,new DTORequestFragrance(name,brand,Float.parseFloat(price),gender,Integer.parseInt(volume),country,aromas,images, Integer.parseInt(installments), Float.parseFloat(interest_on_installments), Boolean.parseBoolean(free_shipping) ,Boolean.parseBoolean(best_seller) ,description));
            System.out.println(response);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo editar la fragancia con el ID: "+id);
        }
    }

}
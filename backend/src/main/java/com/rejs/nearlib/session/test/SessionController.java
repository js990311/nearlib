package com.rejs.nearlib.session.test;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 세션 로그인이 수행되는지 확인하기 위한 간단한 컨트롤러
 */
@Slf4j
@RestController
public class SessionController {
    @Getter
    public static class LoginRequest{
        private String username;
        private String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody LoginRequest loginRequest){
        if(loginRequest.getUsername().equals("username") && loginRequest.getPassword().equals("password")){
            HttpSession session = request.getSession(true);
            session.setAttribute("username", loginRequest.getUsername());
            session.setMaxInactiveInterval(10*60);
            return ResponseEntity.ok(Map.of("status", true));
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status", false));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return ResponseEntity.ok(Map.of("status", true));
    }

    @GetMapping("user")
    public ResponseEntity<?> getUser(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null && session.getAttribute("username") != null){
            log.info("session 있음");
            return ResponseEntity.ok(Map.of("status", true, "username", session.getAttribute("username")));
        }else {
            log.info("session 없음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status", false));
        }
    }
}

package com.balaji.ecommerce.auth;

import com.balaji.ecommerce.security.TokenUtil;
import com.balaji.ecommerce.user.User;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final TokenUtil tokenUtil;

    public AuthController(AuthService authService, TokenUtil tokenUtil) {
        this.authService = authService;
        this.tokenUtil = tokenUtil;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = authService.authenticate(
                request.getEmail(),
                request.getPassword()
        );

        String token = tokenUtil.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return new LoginResponse(token);
    }
}

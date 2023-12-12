package rasmus.java.server.authentication;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

// Not currently in use i.e. Instead uses specific "Role" column in MariaDB MySQL database. Work in Progress.

public class JwtGenerator {

    private static final String SECRET_KEY = "YourSecretKeyHere";

    public static void main(String[] args) {
        String username = "exampleUser";

        String token = generateJWT(username);
        System.out.println("Generated Token: " + token);
    }

    public static String generateJWT(String username) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Prepares header and payload.

        String base64Header = "{\"typ\":\"JWT\",\"alg\":\"HS256\"}";
        String base64Payload = "{\"sub\":\"" + username + "\",\"iat\":" + nowMillis + ",\"exp\":" + (nowMillis + 3600000) + "}";

        // Encode header and payload to Base64.

        String encodedHeader = Base64.getEncoder().encodeToString(base64Header.getBytes(StandardCharsets.UTF_8));
        String encodedPayload = Base64.getEncoder().encodeToString(base64Payload.getBytes(StandardCharsets.UTF_8));

        // Combine encoded header and payload.

        String combinedHeaderPayload = encodedHeader + "." + encodedPayload;

        try {

            // Create HMAC SHA-256 instance.

            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);

            // Generate signature.

            byte[] signatureBytes = sha256Hmac.doFinal(combinedHeaderPayload.getBytes(StandardCharsets.UTF_8));
            String signature = Base64.getEncoder().encodeToString(signatureBytes);

            // Combine encoded header, payload, and signature to form the JWT token.
            
            return combinedHeaderPayload + "." + signature;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}


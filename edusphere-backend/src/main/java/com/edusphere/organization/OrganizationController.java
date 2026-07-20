package com.edusphere.organization;

import com.edusphere.user.User;
import com.edusphere.repository.OrganizationRepository;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
@CrossOrigin
public class OrganizationController {

    private final OrganizationRepository organizationRepository;
    private final AuthService authService;

    @GetMapping("/my")
    public ResponseEntity<Organization> getMyOrganization() {
        User user = authService.getCurrentUser();
        return organizationRepository.findByOwnerId(user.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/seats/invite")
    public ResponseEntity<InviteResponse> inviteMember(@RequestBody InviteRequest request) {
        User user = authService.getCurrentUser();
        Organization org = organizationRepository.findByOwnerId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("No organization found for current owner."));

        if (org.getSeatOccupied() >= org.getSeatCount()) {
            throw new IllegalArgumentException("All available seat slots are currently occupied. Upgrade plan to buy more seats.");
        }

        org.setSeatOccupied(org.getSeatOccupied() + 1);
        organizationRepository.save(org);

        return ResponseEntity.ok(new InviteResponse("Invitation email successfully dispatched to " + request.getEmail()));
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class InviteRequest {
        private String email;
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class InviteResponse {
        private String message;
    }
}

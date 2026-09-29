package backend.backend.controller;

import backend.backend.dto.SubscriptionRequest;
import backend.backend.entity.Subscription;
import backend.backend.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping
    public Subscription addSubscription(@RequestBody SubscriptionRequest request) {
        return subscriptionService.addSubscription(request);
    }

    @GetMapping
    public List<Subscription> getSubscriptions(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return subscriptionService.getSubscriptionsByUserId(userId);
        }
        return subscriptionService.getAllSubscriptions();
    }

    @GetMapping("/{id}")
    public Subscription getSubscriptionById(@PathVariable Long id) {
        return subscriptionService.getSubscriptionById(id);
    }

    @PutMapping("/{id}")
    public Subscription updateSubscription(
            @PathVariable Long id,
            @RequestBody SubscriptionRequest request) {
        return subscriptionService.updateSubscription(id, request);
    }

    @PutMapping("/{id}/renew")
    public Subscription renewSubscription(@PathVariable Long id) {
        return subscriptionService.renewSubscription(id);
    }

    @PutMapping("/{id}/cancel")
    public Subscription cancelSubscription(@PathVariable Long id) {
        return subscriptionService.cancelSubscription(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.ok("Subscription deleted successfully.");
    }
}

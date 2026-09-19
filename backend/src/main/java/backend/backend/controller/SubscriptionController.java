package backend.backend.controller;

import backend.backend.dto.SubscriptionRequest;
import backend.backend.entity.Subscription;
import backend.backend.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
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
    public List<Subscription> getAllSubscriptions() {
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

    @DeleteMapping("/{id}")
    public String deleteSubscription(@PathVariable Long id) {

        subscriptionService.deleteSubscription(id);
        return "Subscription deleted successfully.";
    }
}

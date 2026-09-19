package backend.backend.service;

import backend.backend.dto.SubscriptionRequest;
import backend.backend.entity.Category;
import backend.backend.entity.Subscription;
import backend.backend.entity.User;
import backend.backend.repository.CategoryRepository;
import backend.backend.repository.SubscriptionRepository;
import backend.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;


    public Subscription addSubscription(SubscriptionRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Subscription subscription = Subscription.builder()
                .name(request.getName())
                .provider(request.getProvider())
                .price(request.getPrice())
                .billingCycle(request.getBillingCycle())
                .renewalDate(request.getRenewalDate())
                .status(request.getStatus())
                .user(user)
                .category(category)
                .build();

        return subscriptionRepository.save(subscription);
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Subscription getSubscriptionById(Long id) {
        return subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
    }

    public Subscription updateSubscription(Long id, SubscriptionRequest request) {

        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        subscription.setName(request.getName());
        subscription.setProvider(request.getProvider());
        subscription.setPrice(request.getPrice());
        subscription.setBillingCycle(request.getBillingCycle());
        subscription.setRenewalDate(request.getRenewalDate());
        subscription.setStatus(request.getStatus());
        subscription.setUser(user);
        subscription.setCategory(category);

        return subscriptionRepository.save(subscription);
    }

    public void deleteSubscription(Long id) {

        if (!subscriptionRepository.existsById(id)) {
            throw new RuntimeException("Subscription not found");
        }

        subscriptionRepository.deleteById(id);
    }
}

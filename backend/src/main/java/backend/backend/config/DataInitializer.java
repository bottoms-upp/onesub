package backend.backend.config;

import backend.backend.entity.*;
import backend.backend.repository.CategoryRepository;
import backend.backend.repository.SubscriptionRepository;
import backend.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Categories if empty
        List<String> defaultCategories = List.of(
                "Entertainment",
                "Software & SaaS",
                "Utilities",
                "Health & Fitness",
                "Music",
                "Education",
                "Work & Productivity",
                "Gaming"
        );

        for (String catName : defaultCategories) {
            if (categoryRepository.findByName(catName).isEmpty()) {
                categoryRepository.save(Category.builder().name(catName).build());
            }
        }

        // 2. Seed Demo User if empty
        String demoEmail = "demo@onesub.com";
        Optional<User> demoUserOpt = userRepository.findByEmail(demoEmail);
        User demoUser;

        if (demoUserOpt.isEmpty()) {
            demoUser = userRepository.save(User.builder()
                    .name("Alex Morgan")
                    .email(demoEmail)
                    .password(passwordEncoder.encode("password123"))
                    .build());
        } else {
            demoUser = demoUserOpt.get();
        }

        // 3. Seed Sample Subscriptions for Demo User if user has 0 subscriptions
        if (subscriptionRepository.findByUserId(demoUser.getId()).isEmpty()) {
            Category ent = categoryRepository.findByName("Entertainment").orElseThrow();
            Category soft = categoryRepository.findByName("Software & SaaS").orElseThrow();
            Category music = categoryRepository.findByName("Music").orElseThrow();
            Category work = categoryRepository.findByName("Work & Productivity").orElseThrow();

            List<Subscription> initialSubs = List.of(
                    Subscription.builder()
                            .name("Netflix Premium")
                            .provider("Netflix Inc.")
                            .price(new BigDecimal("649.00"))
                            .billingCycle(BillingCycle.MONTHLY)
                            .renewalDate(LocalDate.now().plusDays(4))
                            .status(SubscriptionStatus.ACTIVE)
                            .user(demoUser)
                            .category(ent)
                            .build(),
                    Subscription.builder()
                            .name("Spotify Duo")
                            .provider("Spotify AB")
                            .price(new BigDecimal("149.00"))
                            .billingCycle(BillingCycle.MONTHLY)
                            .renewalDate(LocalDate.now().plusDays(10))
                            .status(SubscriptionStatus.ACTIVE)
                            .user(demoUser)
                            .category(music)
                            .build(),
                    Subscription.builder()
                            .name("ChatGPT Plus")
                            .provider("OpenAI")
                            .price(new BigDecimal("1999.00"))
                            .billingCycle(BillingCycle.MONTHLY)
                            .renewalDate(LocalDate.now().plusDays(2))
                            .status(SubscriptionStatus.ACTIVE)
                            .user(demoUser)
                            .category(soft)
                            .build(),
                    Subscription.builder()
                            .name("Amazon Prime")
                            .provider("Amazon")
                            .price(new BigDecimal("1499.00"))
                            .billingCycle(BillingCycle.YEARLY)
                            .renewalDate(LocalDate.now().plusDays(45))
                            .status(SubscriptionStatus.ACTIVE)
                            .user(demoUser)
                            .category(ent)
                            .build(),
                    Subscription.builder()
                            .name("Notion AI")
                            .provider("Notion Labs")
                            .price(new BigDecimal("800.00"))
                            .billingCycle(BillingCycle.MONTHLY)
                            .renewalDate(LocalDate.now().minusDays(3))
                            .status(SubscriptionStatus.CANCELLED)
                            .user(demoUser)
                            .category(work)
                            .build()
            );

            subscriptionRepository.saveAll(initialSubs);
        }
    }
}

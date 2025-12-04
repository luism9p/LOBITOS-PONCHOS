import { Droplets, Wind, Thermometer, Shield } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Water Resistant",
    description: "Advanced water-repellent coating keeps you dry in any conditions.",
  },
  {
    icon: Wind,
    title: "Quick Drying",
    description: "High-performance fabric dries 3x faster than traditional materials.",
  },
  {
    icon: Thermometer,
    title: "Thermal Comfort",
    description: "Insulated design maintains optimal body temperature.",
  },
  {
    icon: Shield,
    title: "Durable Build",
    description: "Reinforced stitching and premium materials built to last.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for <span className="text-primary">Performance</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Every detail engineered to enhance your surf experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card hover:bg-card/80 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/50 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

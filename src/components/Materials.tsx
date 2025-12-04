import { Leaf, Recycle, Sparkles } from "lucide-react";

const materials = [
  {
    icon: Sparkles,
    title: "Premium Microfiber",
    description: "Ultra-soft microfiber exterior provides exceptional comfort and absorbency.",
    percentage: "80%",
  },
  {
    icon: Leaf,
    title: "Organic Cotton Blend",
    description: "Sustainable cotton lining that's gentle on skin and the environment.",
    percentage: "15%",
  },
  {
    icon: Recycle,
    title: "Recycled Polyester",
    description: "Eco-friendly recycled materials without compromising on quality.",
    percentage: "5%",
  },
];

export const Materials = () => {
  return (
    <section id="materials" className="py-24 bg-gradient-to-b from-background to-sand-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Premium</span> Materials
          </h2>
          <p className="text-xl text-muted-foreground">
            Crafted from the finest sustainable fabrics for ultimate comfort and performance
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {materials.map((material, index) => (
            <div
              key={index}
              className="group bg-card hover:bg-card/80 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/50 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <material.icon className="h-8 w-8" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-semibold text-card-foreground">
                      {material.title}
                    </h3>
                    <span className="text-3xl font-bold text-primary">
                      {material.percentage}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {material.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              100% Sustainable & Ethically Sourced
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

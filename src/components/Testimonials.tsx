
import { Star, ArrowRight, Users, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AnimatedContainer } from "@/components/ui/animated-container";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "@sarahcrypto",
      role: "Digital Artist",
      content: "Droplink transformed my Pi Network presence! I've earned over 150π in tips and grown my follower base by 400% in just 3 months.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
      metrics: {
        earnings: "150π",
        growth: "400%",
        timeframe: "3 months"
      },
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      username: "@marcusbuilds",
      role: "Content Creator",
      content: "The Pi payment integration is seamless! My audience loves supporting me directly with Pi. Best decision I made for my creator business.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
      metrics: {
        earnings: "89π",
        growth: "250%",
        timeframe: "2 months"
      },
      rating: 5
    },
    {
      id: 3,
      name: "Elena Nakamura",
      username: "@elenanft",
      role: "NFT Artist",
      content: "Professional analytics and beautiful themes helped me convert 35% more visitors into supporters. Droplink is essential for Pi creators!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
      metrics: {
        earnings: "210π",
        growth: "35%",
        timeframe: "4 months"
      },
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      username: "@davidtech",
      role: "Tech Educator",
      content: "From zero to 500+ subscribers using Droplink's powerful features. The QR codes and scheduling tools are game-changers!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
      metrics: {
        earnings: "95π",
        growth: "500+",
        timeframe: "5 months"
      },
      rating: 5
    },
    {
      id: 5,
      name: "Priya Patel",
      username: "@priyacreates",
      role: "Lifestyle Blogger",
      content: "The custom domains and whitelabel features make my brand look incredibly professional. My conversion rate doubled overnight!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
      metrics: {
        earnings: "127π",
        growth: "200%",
        timeframe: "6 weeks"
      },
      rating: 5
    },
    {
      id: 6,
      name: "Alex Thompson",
      username: "@alexinnovates",
      role: "Innovation Consultant",
      content: "Droplink's analytics helped me understand my audience better. I now know exactly what content resonates and earn consistently.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face",
      metrics: {
        earnings: "178π",
        growth: "320%",
        timeframe: "4 months"
      },
      rating: 5
    }
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "10,000+",
      label: "Active Creators",
      color: "text-blue-600"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      number: "25,000π",
      label: "Total Earnings",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      number: "89%",
      label: "Success Rate",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <AnimatedContainer animation="fade" className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Community Love
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Creators Thriving with Droplink
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Pi Network creators who've transformed their online presence and started earning with their content
          </p>
        </AnimatedContainer>

        {/* Stats Section */}
        <AnimatedContainer animation="scale" delay={0.2} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${stat.color} bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedContainer>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <AnimatedContainer key={testimonial.id} animation="scale" delay={0.1 * (index + 1)}>
              <Card className="h-full bg-white/90 backdrop-blur-sm border-gray-200 hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Header with Avatar and Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-primary font-medium">{testimonial.username}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Metrics */}
                  <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary">{testimonial.metrics.earnings}</div>
                        <div className="text-xs text-gray-600">Earned</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{testimonial.metrics.growth}</div>
                        <div className="text-xs text-gray-600">Growth</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">{testimonial.metrics.timeframe}</div>
                        <div className="text-xs text-gray-600">Timeline</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedContainer animation="fade" delay={0.8} className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">
                Ready to Join Our Thriving Community?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Start your journey today and see why creators choose Droplink to grow their Pi Network presence
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg"
                  asChild
                >
                  <Link to="/signup" className="flex items-center gap-2">
                    Start Free Today <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link to="/demo">Try Demo First</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>10k+ creators</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Free to start</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default Testimonials;

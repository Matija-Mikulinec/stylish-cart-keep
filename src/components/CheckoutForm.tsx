
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { CreditCard, Check } from "lucide-react";

// Schema for form validation
const formSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(3, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
  saveInfo: z.boolean().optional(),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const CheckoutForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart, totalItems, totalPrice, closeCart } = useCart();
  const navigate = useNavigate();

  // Initialize form with default values from localStorage if available
  const savedInfo = localStorage.getItem("checkoutInfo");
  const defaultValues: Partial<CheckoutFormValues> = savedInfo 
    ? JSON.parse(savedInfo)
    : {
        fullName: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        saveInfo: true,
        notes: "",
      };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Save form data if the user opted in
      if (data.saveInfo) {
        localStorage.setItem("checkoutInfo", JSON.stringify(data));
      } else {
        localStorage.removeItem("checkoutInfo");
      }
      
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Create order object (would be sent to backend in a real app)
      const order = {
        customerInfo: {
          fullName: data.fullName,
          email: data.email,
          address: data.address,
          city: data.city,
          zipCode: data.zipCode,
          country: data.country,
        },
        notes: data.notes,
        items: cart.items,
        totalAmount: totalPrice,
        orderId: `ORD-${Date.now()}`,
      };
      
      console.log("Order submitted:", order);
      
      // Clear the cart
      localStorage.removeItem("cart");
      
      // Show success message
      toast.success("Order placed successfully! Thank you for your purchase.", {
        duration: 5000,
      });
      
      // Redirect to home with a small delay to allow toast to be seen
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // Force reload to clear cart state
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("An error occurred while placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Your Information</h2>
          
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Shipping Address</h2>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip/Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Special instructions for delivery or any other notes" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="saveInfo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Save my information for next time</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Processing Order...</>
          ) : (
            <>
              <CreditCard className="mr-2" size={18} /> 
              Complete Order
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;

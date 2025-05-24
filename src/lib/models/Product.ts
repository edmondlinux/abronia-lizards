
import mongoose from 'mongoose';
import { Product } from '@/types/product.types';

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  srcUrl: String,
  gallery: [String],
  price: Number,
  discount: {
    amount: Number,
    percentage: Number
  },
  rating: Number,
  seo: {
    title: String,
    description: String,
    keywords: [String],
    metaTags: [{
      name: String,
      property: String,
      content: String
    }]
  }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);

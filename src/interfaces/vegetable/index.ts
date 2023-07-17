import { VendorInterface } from 'interfaces/vendor';
import { GetQueryInterface } from 'interfaces';

export interface VegetableInterface {
  id?: string;
  name: string;
  price: number;
  vendor_id?: string;
  created_at?: any;
  updated_at?: any;

  vendor?: VendorInterface;
  _count?: {};
}

export interface VegetableGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  vendor_id?: string;
}

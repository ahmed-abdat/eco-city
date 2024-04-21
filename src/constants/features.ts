import { Building, Plus, Trash ,Waves } from 'lucide-react';
import sweager from './sewage.png'


export const features = [
    {
        'id': 1,
        'name' : 'Report Unlawful Construction',
        'icon' : Building,
    },{
      'id': 2,
      'name' : "Report Garbage",
      'icon' : Trash,

    }, 
    {
      'id': 3,
      'name' : 'Report Sanitation Problems',
      'icon' : Waves,
    }, 
    {
      id : 4,
      'name' : 'other',
      'icon' : Plus
    }
]
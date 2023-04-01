import { SvgIconComponent } from '@mui/icons-material';

export interface NavMenuItems {
  title: string;
  path: string;
  Icon: SvgIconComponent;
  disabled?: boolean;
}
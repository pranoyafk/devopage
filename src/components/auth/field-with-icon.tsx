import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type Icon } from '@tabler/icons-react';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface FieldWithIconProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  icon: Icon;
  placeholder: string;
  label: string;
  disabled: boolean;
  type?: string;
}

export function FieldWithIcon<T extends FieldValues>({
  field,
  icon: Icon,
  placeholder,
  label,
  disabled,
  type = 'text',
}: FieldWithIconProps<T>) {
  return (
    <FormItem className="space-y-2">
      <FormLabel className="text-sm font-medium capitalize">{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            className="pr-4 pl-10"
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            {...field}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center">
            <Icon size={16} aria-hidden="true" />
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

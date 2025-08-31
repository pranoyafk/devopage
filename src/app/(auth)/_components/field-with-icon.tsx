import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type Icon } from '@tabler/icons-react';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface FieldWithIconProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  icon: Icon;
  placeholder: string;
  label: string;
  disabled: boolean;
}

export function FieldWithIcon<T extends FieldValues>({
  field,
  icon: Icon,
  placeholder,
  label,
  disabled,
}: FieldWithIconProps<T>) {
  return (
    <FormItem className="*:not-first:mt-2">
      <FormLabel className="capitalize">{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input className="peer ps-9" disabled={disabled} placeholder={placeholder} {...field} />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <Icon size={16} aria-hidden="true" />
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

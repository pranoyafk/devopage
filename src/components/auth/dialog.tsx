'use client';

import { useState, type ReactNode } from 'react';
import { SignInForm } from './sign-in';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { SignUpForm } from './sign-up';

export type AuthPage = 'sign-in' | 'sign-up';

export function AuthDialog({
  page = 'sign-in',
  children,
}: {
  page?: AuthPage;
  children: ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState<AuthPage>(page);
  function switchPage(page: AuthPage) {
    setCurrentPage(page);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault(); // Prevent the dialog from closing
        }}
        className="w-[450px] overflow-hidden p-0"
      >
        {currentPage === 'sign-in' && <SignInForm switchPage={switchPage} />}
        {currentPage === 'sign-up' && <SignUpForm switchPage={switchPage} />}
      </DialogContent>
    </Dialog>
  );
}

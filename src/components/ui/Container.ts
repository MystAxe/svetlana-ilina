interface ContainerProps {
  content: string;
  className?: string;
}

export function Container({ content, className = '' }: ContainerProps): string {
  return `<div class="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8 ${className}">${content}</div>`;
}

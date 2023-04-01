export interface SetGetArgs {
  onSuccess?: (args: any) => void;
  onError?: (args: any) => void;
  onSettled?: (args: any) => void;
  onMutate?: (args: any) => void;
}
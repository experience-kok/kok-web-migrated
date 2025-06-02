import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

/**
 * 회원가입 버튼 컴포넌트
 */
export default function SignUpButton() {
  return (
    <Button className="h-12 w-full rounded-lg" variant="outline" disabled>
      <Text weight="semibold">회원가입</Text>
    </Button>
  );
}

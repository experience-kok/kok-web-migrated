import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

/**
 * 로그인 버튼 컴포넌트
 */
export default function LoginButton() {
  return (
    <Button className="h-12 w-full rounded-lg bg-gray-900 hover:bg-gray-900/90" disabled>
      <Text weight="semibold" color="white">
        로그인
      </Text>
    </Button>
  );
}

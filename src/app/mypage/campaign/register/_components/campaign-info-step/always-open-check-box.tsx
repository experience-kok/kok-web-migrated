import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * '상시 모집 캠페인' 옵션을 선택하기 위한 체크박스 컴포넌트입니다.
 *
 * @param {boolean} props.checked - 체크박스의 현재 선택 상태입니다.
 * @param {(checked: boolean) => void} props.onChange - 체크박스의 상태가 변경될 때 호출되는 콜백 함수입니다.
 */
export default function AlwaysOpenCheckBox({ checked, onChange }: Props) {
  return (
    <Label className="hover:bg-accent/50 has-[[aria-checked=true]]:border-ck-blue-500 has-[[aria-checked=true]]:bg-ck-blue-50 ck-interactive-scale mt-10 flex items-start gap-3 rounded-[12px] border-2 p-3">
      <Checkbox id="toggle-2" checked={checked} onCheckedChange={onChange} />
      <div className="grid gap-1.5">
        <p className="ck-body-2-bold leading-none">상시 모집 캠페인</p>
        <p className="text-ck-gray-700 ck-body-2">
          모집 기간이 정해져 있지 않고, <br />
          <span className="text-ck-blue-500 ck-body-2-bold"> 언제든지 지원자를 선정</span>할 수 있는
          캠페인이에요.
        </p>
      </div>
    </Label>
  );
}

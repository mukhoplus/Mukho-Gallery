import React from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

interface RegisterDatePickerProps {
  value: Date | null;
  setValue: (d: Date | null) => void;
}

export default function RegisterDatePicker({
  value,
  setValue,
}: RegisterDatePickerProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        생년월일
      </label>
      <DatePicker
        selected={value}
        onChange={setValue}
        dateFormat="yyyy-MM-dd"
        placeholderText="yyyy-mm-dd"
        locale={ko}
        maxDate={new Date()}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
                   hover:border-emerald-500 focus:border-emerald-500
                   text-gray-900 placeholder-gray-500 outline-none select-text transition-all"
        value={value ? format(value, "yyyy-MM-dd") : ""}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between items-center px-2 py-1">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            {/* 년도 드롭다운 */}
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(Number(value))}
              className="mx-1"
            >
              {Array.from({ length: 100 }, (_, i) => 2025 - i).map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            {/* 월 드롭다운 */}
            <select
              value={date.getMonth()}
              onChange={({ target: { value } }) => changeMonth(Number(value))}
              className="mx-1"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i + 1}월
                </option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
}

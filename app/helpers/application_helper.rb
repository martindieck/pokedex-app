module ApplicationHelper
  def format_number(number)
    case number
    when 1_000..999_999 then "#{(number / 1_000.0).round(3)}k"
    when 1_000_000..999_999_999 then "#{(number / 1_000_000.0).round(3)}m"
    when 1_000_000_000..Float::INFINITY then "#{(number / 1_000_000_000.0).round(3)}b"
    else
      "#{number.round(3)}"
    end
  end
end

system "clear"

num = 1
while num <= 100
    if num % 3 == 0 && num % 5 == 0
        puts "#{num}. FIZZBUZZ!"
    elsif num % 3 == 0
        puts "#{num}. FIZZ!"
    elsif num % 5 == 0
        puts "#{num}. BUZZ!"
    else
        puts  "#{num}."
    end
    num += 4
end
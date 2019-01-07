FactoryGirl.define do
  factory :message do
    body        'test'
    image File.open("spec/images/rVo_9_0QnMS9ieHy0Hg51kqrdg.jpg")
    user
    group
  end
end

class Expression < ApplicationRecord

  # RELATIONSHIPS #
  belongs_to :author, class_name: "User"

end

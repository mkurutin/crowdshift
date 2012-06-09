class AddEventApiIdColumnToEvents < ActiveRecord::Migration
  def change
    add_column :events, :event_api_id, :string
  end
end

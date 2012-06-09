class CreateEvent < ActiveRecord::Migration
  def up
    create_table :events do |t|
      t.string :name
      t.string :description
      t.string :location
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end
  end

  def down
    drop_table :events
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Data ..."

puts "Creating points ..."

Point.destroy_all
Trip.create(id: 1, name: "Fun Trip", start_date: "2020-02-10", end_date: '2020-02-20')

Point.create(id: 1, name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-20 02:15:41.123924', end_time: '2020-02-20 03:15:41.123924', trip_id: 1)
Point.create(id: 2, name: "Seattle", latitude: 47.6062095, longitude: 122.3320708, start_time: '2020-02-20 04:15:41.123924', end_time: '2020-02-20 05:15:41.123924', trip_id: 1)
Point.create(id: 5, name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-21 02:15:41.123924', end_time: '2020-02-21 03:15:41.123924', trip_id: 1)
Point.create(id: 6, name: "Seattle", latitude: 47.6062095, longitude: 122.3320708, start_time: '2020-02-21 04:15:41.123924', end_time: '2020-02-21 05:15:41.123924', trip_id: 1)
Point.create(id: 7, name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-22 02:15:41.123924', end_time: '2020-02-22 03:15:41.123924', trip_id: 1)
Point.create(id: 8, name: "Seattle", latitude: 47.6062095, longitude: 122.3320708, start_time: '2020-02-22 04:15:41.123924', end_time: '2020-02-22 05:15:41.123924', trip_id: 1)



Point.create(id: 3, name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-20 02:15:41.123924', end_time: '2020-02-20 03:15:41.123924', trip_id: 2)
Point.create(id: 4, name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-20 04:00:41.123924', end_time: '2020-02-20 05:15:41.123924', trip_id: 2)
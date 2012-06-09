module Api
  class CrowdshiftService
    include HTTParty
    base_uri 'crowdshift.herokuapp.com'

    def create_event
      options = {:headers => { 'authorization' => "bearer 30a17a7e-faeb-46dd-a54c-94f36b9e1464"} }
      self.class.post('/event', options)
    end

    def create_commitment(event_api_id, start_date, end_date)
      start_date = start_date.utc.strftime("%Y-%m-%dT%H:%M:%S")
      end_date = end_date.utc.strftime("%Y-%m-%dT%H:%M:%S")
      options = { :headers => { 'authorization' => "bearer 30a17a7e-faeb-46dd-a54c-94f36b9e1464"},
                  :body => { 'start' => start_date, 'end' => end_date } }
      self.class.post("/event/#{event_api_id}/commitment", options)
    end

  end
end

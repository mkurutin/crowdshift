module Api
  class CrowdshiftService
    include HTTParty
    base_uri 'crowdshift.herokuapp.com'

    def create_event
      options = {:headers => { 'authorization' => "bearer 30a17a7e-faeb-46dd-a54c-94f36b9e1464"} }
      self.class.post('/event', options)
    end

  end
end
